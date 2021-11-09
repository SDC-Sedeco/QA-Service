import React from 'react';
import { shallow } from 'enzyme';
import QuestionsNAnswersContainer from './QuestionsNAnswersContainer.jsx';

test('<QuestionsNAnswersContainer /> renders properly', () => {
  const wrapper = shallow(<QuestionsNAnswersContainer displayStyles={[1]}/>);
  expect(wrapper.find('div').children()).toHaveLength(1);
});
