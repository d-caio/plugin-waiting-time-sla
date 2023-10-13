import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import ShowRating from './components/ShowRating'

const PLUGIN_NAME = 'WaitingTimeSlaPlugin';

export default class WaitingTimeSlaPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    //Show Rating
    flex.TaskListButtons.Content.add(
      <ShowRating key="task-item-data" manager={manager}/>,
      {
        align: "end", 
        sortOrder: 1,
        if: (props) => ['assigned'].includes(props.task.taskStatus)
        
    })
  }
}
