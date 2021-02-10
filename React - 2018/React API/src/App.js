import React from "react";

/*
import JSX from "Components/1-jsx/index";
import Comment from "Components/2-components-props/index";
import Clock from "Components/3-state-lifecycle/index";
import ActionItems from "Components/4-handling-events";
import LoginControl from "Components/5-conditional-rendering/LoginControl";
import Blog from "Components/6-lists-keys/index";
import ContactForm from "Components/7-forms/index";
import Calculator from "Components/8-lifting-state-up/Calculator";
import SignUpDialog from "Components/9-composition/SignUpDialog";
import AutoFocusTextInput from "Components/10-ref/AutoFocusTextInput";
import CustomTextInput from "Components/10-ref/CustomTextInput";
import Menu from "Components/11-forwarding-ref/Menu"
import Dialog from "Components/12-prop-types/Dialog";
import FancyCounter from "Components/13-error-boundary/FancyCounter";
import FragmentTable from "./components/14-fragments/FragmentTable";
import ContentBox from "./components/16-hoc/ContentBox";
import Desktop from "./components/15-render-props/Desktop";
import ContainerWithPortal from "./components/17-portals/ContainerWithPortal";
import ButtonList from "./components/18-pure-components/ButtonList";
import ContextApp from "./components/19-context-api/ContextApp";
*/

import TimerList from "./components/16-hoc/TimerList";

const commentData = {
  user: {
    name: 'Sven',
    avatarUrl: 'https://picsum.photos/100/100'
  },
  comment: {
    text: 'React is awesome!',
    date: new Date()
  }
};

const posts = [
  {id: 1, title: 'What is React?', content: 'React is awesome, period!'},
  {id: 2, title: 'Why use React?', content: 'Because it is super awesome.'},
  {id: 3, title: 'Who uses React?', content: 'Everyone should us it!'}
];

class App extends React.Component {
  render() {
    
    /*
    <Calculator />
        <ContactForm />
        <Blog posts={posts} />
        <LoginControl />
        <JSX />
        <Comment 
          user={commentData.user}
          comment={commentData.comment}
        />
        <Clock />
        <Clock />
        <ActionItems />
        <SignUpDialog />
        <CustomTextInput />
        <AutoFocusTextInput />
        <CustomTextInput />
        <Menu />
        <Dialog 
          id={5}
          message={"Warning!"}
          content={"You are about to enter the spaceship."}
        />
        <FancyCounter />
        <FragmentTable />
        <Desktop />
        
        <ContainerWithPortal />
        <ButtonList />
        <ContextApp />
    */

    return (
      <div>
        <TimerList />
      </div>
    );
  }
}

export default App;