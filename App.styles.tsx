import { StyleSheet } from 'react-native';

export const colors = {
  mainBG: '#121212',
  subBG: '#181818',
  text: '#D9D9D9',
  subText: '#B3B3B3',
  fieldBorder: '#48484A',
  fieldPristine: '#6A6F7C',
  dropdownBG: '#444',
  dropdownButtonBG: '#374151',
  dropdownBorder: '#4B5563',
  dropdownRowBorder: '#C5C5C5',
  buttonBG: '#1DB955',
  buttonText: '#E7F8ED',
  border: '#272727',
  white: '#FFF',
  danger: '#CE1A2B',
};

export default StyleSheet.create({
  // Main
  mainBox: {
    backgroundColor: colors.mainBG,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subBox: {
    flex: 1,
  },
  title: {
    marginTop: '20%',
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 38,
    color: colors.text,
    fontFamily: 'raleway-bold',
  },

  // Reminders
  remindersBox: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    height: '72%',
    overflow: 'scroll',
    backgroundColor: colors.subBG,
  },
  reminder: {
    borderTopWidth: 1,
    padding: 18,
    paddingTop: 24,
    paddingBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.subBG,
  },
  reminderName: {
    color: colors.text,
    fontFamily: 'raleway-semibold',
    fontSize: 18,
    width: '66%',
  },
  reminderTimeBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderTime: {
    color: colors.subText,
    fontFamily: 'raleway-regular',
    fontSize: 20,
  },
  reminderRowBack: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  reminderBackRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 100,
  },
  reminderBackRightBtnRight: {
    backgroundColor: colors.danger,
    right: 0,
  },
  reminderBackText: {
    fontSize: 18,
    fontFamily: 'raleway-regular',
    color: colors.white,
  },

  // Form
  form: {
    height: '72%',
    overflow: 'scroll',
    backgroundColor: colors.mainBG,
  },
  formInputBox: {
    borderTopWidth: 1,
    borderColor: colors.fieldBorder,
    padding: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.subBG,
  },
  formInput: {
    fontFamily: 'raleway-regular',
    color: colors.white,
    fontSize: 16,
  },
  formDropdownBox: {
    borderTopWidth: 1,
    borderColor: colors.fieldBorder,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.subBG,
  },
  formDropdownButton: {
    height: 40,
    backgroundColor: colors.dropdownButtonBG,
    borderRadius: 8,
    borderColor: colors.dropdownBorder,
    borderWidth: 1,
    fontSize: 14,
    width: '43%',
  },
  formDropdownButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'raleway-regular',
    fontSize: 14,
  },
  formDropdown: {
    backgroundColor: colors.dropdownBG,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  formDropdownRow: {
    backgroundColor: colors.dropdownBG,
    borderBottomColor: colors.dropdownRowBorder,
  },
  formDropdownRowText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'raleway-semibold',
  },
  formCheckboxBox: {
    borderTopWidth: 1,
    borderColor: colors.fieldBorder,
    padding: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.subBG,
  },
  formCheckboxText: {
    color: colors.white,
    fontFamily: 'raleway-regular',
    fontSize: 15,
  },
  formActions: {
    borderTopWidth: 1,
    borderColor: colors.fieldBorder,
    paddingTop: 18,
    paddingBottom: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formCancel: {
    backgroundColor: 'transparent',
    borderColor: colors.buttonText,
    width: '40%',
    borderWidth: 1,
  },
  formCancelText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'raleway-bold',
    color: colors.buttonText,
  },
  formSave: {
    width: '40%',
  },
  formSaveText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'raleway-bold',
  },
  formFieldDirty: {
    color: colors.white,
  },
  formFieldPistine: {
    color: colors.fieldPristine,
  },

  // Add button
  addBox: {
    display: 'flex',
    alignItems: 'center',
  },
  addTouch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 100,
    marginTop: '-30%',
    marginBottom: 0,
    backgroundColor: colors.buttonBG,
  },
  buttonText: {
    fontSize: 60,
    marginTop: -6,
    color: colors.buttonText,
  },
  buttonCommon: {
    backgroundColor: colors.buttonBG,
  },
  buttonTextCommon: {
    color: colors.buttonText,
  },

  // Misc
  borderColor: {
    borderColor: colors.border,
  },
});
