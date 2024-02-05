import { TextInput } from 'react-native-paper'

export default function TextInputComp({ func, value, label }) {
  return (
    <TextInput
      style={{ width: '80%' }}
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
