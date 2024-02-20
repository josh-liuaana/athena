import { useState } from 'react'
import { TextInput } from 'react-native-paper'

export function TextInputComp({ func, value, label, style }) {
  return (
    <TextInput
      style={style}
      onChangeText={func}
      value={value}
      mode="outlined"
      label={label}
      autoCapitalize="words"
      autoCorrect={false}
      selectionColor="#171d0b"
      activeOutlineColor="#5a712c"
      textColor="#171D0B"
    />
  )
}

export function PasswordInput({ func, value, label }) {
  const [hidePassword, setHidePassword] = useState(true)

  return (
    <TextInput
      autoCorrect={false}
      style={{ width: '80%', backgroundColor: 'white' }}
      mode="outlined"
      label={label}
      secureTextEntry={hidePassword}
      right={
        <TextInput.Icon
          icon="eye"
          rippleColor="#DBE2CC"
          onPress={() => setHidePassword(!hidePassword)}
        />
      }
      value={value}
      onChangeText={func}
      selectionColor="#171D0B"
      activeOutlineColor="#5a712c"
      textColor="#171D0B"
      autoCapitalize="none"
    />
  )
}
