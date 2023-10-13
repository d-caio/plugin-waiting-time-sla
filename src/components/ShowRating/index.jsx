import React, { useState, useEffect } from "react";
import { withTaskContext } from "@twilio/flex-ui";

const TaskItemData = (props) => {
  const [currentTime, setCurrentTime] = useState(Date.parse(new Date()))
  const [mustRespond, setMustRespond] = useState("default")

  useEffect(async () => {
    let conversationSid = props.task.attributes.conversationSid
    let conversation = await props.manager.conversationsClient.getConversationBySid(conversationSid)
    let { items } = await conversation.getMessages()

    let message = items.find(e => e.index === conversation.lastMessage.index)

    const green = 1000 * 60 * 4
    const yellow = green * 2

    const updateTime = () => {
      setCurrentTime(Date.parse(new Date()))
    }

    setInterval(updateTime, 1000)

    const messageSentTime = Date.parse(message.dateCreated)

    if (props.manager.user.identity === message.author) {
      setMustRespond("default")
    } else {
      if (currentTime - messageSentTime < green) {
        setMustRespond("green")
      } else if (currentTime - messageSentTime < yellow) {
        setMustRespond("yellow")
      } else {
        setMustRespond("red")
      }
    }
  }, [props.task, currentTime]);

  const bgColors = (light, dark) => {
    if (props.theme.isLight) {
      props.theme.TaskList.Item.Container.background = light
      props.theme.TaskList.Item.SelectedContainer.background = light
    } else {
      props.theme.TaskList.Item.SelectedContainer.background = dark
      props.theme.TaskList.Item.SelectedContainer.background = dark
    }
  }

  if (mustRespond === "default") {
    bgColors("rgb(244, 244, 246)", "rgb(18, 28, 45)")
  } else if (mustRespond === "green") {
    bgColors("rgb(190, 255, 195, 100)", "rgb(6, 92, 0, 100)")
  } else if (mustRespond === "yellow") {
    bgColors("rgb(254, 255, 143, 100)", "rgb(203, 131, 5, 100)")
  } else {
    bgColors("rgb(250, 153, 153, 100)", "rgb(145, 0, 0, 100)")
  }
  
  return (
    <div className="timeComponentContainerSla"></div>
  );
};

export default withTaskContext(TaskItemData);
