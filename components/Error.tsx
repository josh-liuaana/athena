import { View, StyleSheet } from 'react-native'
import { Modal, Portal, Text, Button, Icon } from 'react-native-paper'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useState } from 'react'
import { hideError } from '../redux/error/errorSlice'

export default function Error() {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector((state) => state.error)
  const [visible, setVisible] = useState(true)
  const hideModal = () => {
    dispatch(hideError(null))
    setVisible(false)
  }

  return (
    <Portal>
      <View style={styles.container}>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Icon source="alert" color={'#B21C0E'} size={20} />
          <Text>{errorMessage}</Text>
          <Button onPress={() => hideModal()}>Close</Button>
        </Modal>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '20%',
    width: '80%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    gap: 20,
  },
})
