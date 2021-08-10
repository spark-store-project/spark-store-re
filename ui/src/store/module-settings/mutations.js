export function toggleGeneralSetting (state, index) {
  state.generalSetting[index].enabled = !state.generalSetting[index].enabled
}
export function togglePrivacySetting (state, index) {
  state.privacySetting[index].enabled = !state.privacySetting[index].enabled
}
