import { StyleSheet } from 'react-native'

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBE2CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  logo: {
    height: 200,
    width: 203,
    margin: 15,
  },

  subtitle: {
    textAlign: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 40,
    fontFamily: 'vibes',
    letterSpacing: 3,
    color: '#5a712c',
  },

  buttonContainer: {
    flex: 0.45,
    width: '80%',
  },
  topButtonContainer: {
    height: '50%',
  },
  bottomButtonsContainer: {
    height: '50%',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    flex: 0.5,
    padding: 15,
    margin: 5,
    backgroundColor: '#5a712c',
    elevation: 4,
    shadowColor: '#171D0B',
  },

  buttonTop: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonLeft: {
    borderBottomLeftRadius: 10,
  },
  buttonRight: {
    borderBottomRightRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'caveat',
  },

  icon: {
    marginTop: 20,
    fontSize: 40,
  },
})
