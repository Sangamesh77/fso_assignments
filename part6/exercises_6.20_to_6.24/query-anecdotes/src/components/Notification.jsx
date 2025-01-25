import { useNotificationValue } from "../state/NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notificationValue = useNotificationValue()

  console.log("notificaiton value:", notificationValue)

  if(notificationValue){
  return (
    <div style={style}>
      {notificationValue}
    </div>
  )}
  else{
    return null
  }
}

export default Notification
