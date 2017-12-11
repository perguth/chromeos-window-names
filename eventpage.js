// eventpage

// chrome.windows.WINDOW_ID_CURRENT

chrome.tabs.onActivated.addListener(registerHandlers)


let state = {
  windows: {
    // {windowId: {activeTabId: id of active tab, customTitle: name of window}}
  },
  tabs: {
    // {tabId: {originalTitle: original title, originalIcon: original icon}
  }
}

function registerHandlers (tab) {
  console.log('onActivated', tab)
  let windowId = tab.windowId
  let tabId = tab.id
  let tabIcon = tab.favIconUrl
  let tabTitle = tab.title
  
  if (!state.windows[windowId]) return
  let oldActiveTabId = state.windows[windowId].tabId
  if (oldActiveTabId === tabId) return
  
  // persist data
  state.windows[windowId].activeTabId = tabId
  state.tabs[tabId] = {
    originalTitle: tabTitle
  }
  // change title of the new active tab to window name
  changeTitle(tabId, state.windows[windowId].customTitle)
  // change title of the previous tab back to original
  changeTitle(oldActiveTabId, state.tabs[oldActiveTabId].originalTitle)
  
  // clean up
  delete state.tabs[oldActiveTabId]
}

function getState () {
  chrome.storage.local.get('state', x => {
    state = x
  })
}

function changeTitle (tabId, title) {
  chrome.tabs.get(tabId, tab => {
    firstTab = tab.pop()
    console.log('tabs!', firstTab)
    chrome.tabs.executeScript(null, {
      code: `document.title = '${title}'`
    }, x => console.log('done'))
  })
}