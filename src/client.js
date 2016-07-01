/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { match } from 'universal-router';
import routes from './routes';
import history from './core/history';
import configureStore from './store/configureStore';
import { addEventListener, removeEventListener } from './core/DOMUtils';
import Provide from './components/Provide';

import { addLocaleData } from 'react-intl';
import { loadToken } from './actions/auth';

import en from 'react-intl/locale-data/en';
import cs from 'react-intl/locale-data/cs';

[en, cs].forEach(addLocaleData);

const context = {
  store: null,
  insertCss: styles => styles._insertCss(), // eslint-disable-line no-underscore-dangle
  setTitle: value => (document.title = value),
  setMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    Array.from(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document
      .getElementsByTagName('head')[0]
      .appendChild(meta);
  },
};

// Restore the scroll position if it was saved into the state
function restoreScrollPosition(state) {
  if (state && state.scrollY !== undefined) {
    window.scrollTo(state.scrollX, state.scrollY);
  } else {
    window.scrollTo(0, 0);
  }
}

let renderComplete = (state, callback) => {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  callback(true);
  renderComplete = (s) => {
    restoreScrollPosition(s);

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    window.ga('send', 'pageview');

    callback(true);
  };
};

function render(container, state, config, component) {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(// eslint-disable-line no-console
        'React rendering. State:',
        config.store.getState()
      );
    }

    try {
      ReactDOM.render(
        <Provide {...config}>
          {component}
        </Provide>,
        container,
        renderComplete.bind(undefined, state, resolve)
      );
    } catch (err) {
      reject(err);
    }
  });
}

export default function main() {
  let currentLocation = null;
  const container = document.getElementById('app');
  const initialState = JSON.parse(
    document.
      getElementById('source').
      getAttribute('data-initial-state')
  );

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  const store = configureStore(initialState, {});
  context.store = store;

  if (initialState.auth.isAuthenticated) {
    store.dispatch(loadToken());
  }

  // Re-render the app when window.location changes
  const removeHistoryListener = history.listen(location => {
    currentLocation = location;
    match(routes, {
      path: location.pathname,
      query: location.query,
      state: location.state,
      context,
      render: render.bind(undefined, container, location.state, { store }),
    }).catch(err => console.error(err)); // eslint-disable-line no-console
  });

  // Save the page scroll position into the current location's state
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  const setPageOffset = () => {
    currentLocation.state = currentLocation.state || Object.create(null);
    if (supportPageOffset) {
      currentLocation.state.scrollX = window.pageXOffset;
      currentLocation.state.scrollY = window.pageYOffset;
    } else {
      currentLocation.state.scrollX = isCSS1Compat ?
        document.documentElement.scrollLeft : document.body.scrollLeft;
      currentLocation.state.scrollY = isCSS1Compat ?
        document.documentElement.scrollTop : document.body.scrollTop;
    }
  };

  addEventListener(window, 'scroll', setPageOffset);
  addEventListener(window, 'pagehide', () => {
    removeEventListener(window, 'scroll', setPageOffset);
    removeHistoryListener();
  });
}
