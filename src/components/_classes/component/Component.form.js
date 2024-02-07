import _ from 'lodash';

import ComponentEditConditional from './editForm/Component.edit.conditional';
import ComponentEditData from './editForm/Component.edit.data';
import ComponentEditAPI from './editForm/Component.edit.api';
import ComponentEditDisplay from './editForm/Component.edit.display';
import ComponentEditLogic from './editForm/Component.edit.logic';
import ComponentEditValidation from './editForm/Component.edit.validation';
import ComponentEditLayout from './editForm/Component.edit.layout';
import EditFormUtils from './editForm/utils';

export default function(...extend) {
  const components = _.cloneDeep([
    {
      
      
      weight: 10,
      type:'checkbox',
      key:'validate.required',
      label: 'Required',
      tooltip: 'A required field must be filled in before the form can be submitted.',
      input: true,
      
},    

    
    {
      
      
      type: 'tabs',
      key: 'tabs',
      components: [
        {
          label: 'EDITOR',
          key: 'display',
          weight: 0,
          icon:'terminal',
          components: ComponentEditDisplay
        },
        {
          label: 'Data',
          key: 'data',
          weight: 10,
          components: ComponentEditData
        },
        // {
        //   label: 'Validation',
        //   key: 'validation',
        //   weight: 20,
        //   components: ComponentEditValidation
        // },
        // {
        //   label: 'API',
        //   key: 'api',
        //   weight: 30,
        //   components: ComponentEditAPI
        // },
        {
          label: 'CONDITION',
          key: 'conditional',
          icon:'terminal',
          weight: 40,
          components: ComponentEditConditional
        },
        {
          label: 'LOGIC',
          key: 'logic',
          icon:'glyphicon glyphicon-random',
          weight: 50,
          components: ComponentEditLogic
        },
        
        // {
        //   label: 'Layout',
        //   key: 'layout',
        //   weight: 60,
        //   components: ComponentEditLayout
        // },
      ],
    },
    
  ]).concat(extend.map((items) => ({
    type: 'tabs',
    key: 'tabs',
    components: _.cloneDeep(items),
  })));
  return {
    components: _.unionWith(components, EditFormUtils.unifyComponents).concat({
      type: 'hidden',
      key: 'type'
    })
  };


}