import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function SubmitButton({
  buttonText,
  clickHandleFunction,
  disabled,
}) {
  return (
    <Button
      onPress={clickHandleFunction}
      mode="elevated"
      compact={false}
      buttonColor="#5a712c"
      textColor="white"
      rippleColor="#DBE2CC"
      disabled={disabled}
      style={styles.button}
    >
      {buttonText}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
})
