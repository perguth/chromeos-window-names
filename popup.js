// popup

let windowId = chrome.windows.WINDOW_ID_CURRENT
let state = {
  windows: {},
  tabs: {}
}
getState()
    saveState()

let input = document.getElementById('customWindowTitle')
if (state.windows[windowId]) {
  input.innerText = state.windows[windowId].customTitle
}

document.getElementById('saveButton').onclick = x => {
  chrome.windows.getCurrent(tab => {
    let customWindowTitle = input.value
    state.windows[windowId] = {
      customTitle: customWindowTitle,
      activeTab: tab.id
    }
    console.log('got clicked')
    saveState()
  })
}

function getState () {
  chrome.storage.local.get('state', x => {
    state = JSON.parse(x)
  })
}

function saveState () {
  chrome.storage.local.set('state', JSON.stringify(state))
}