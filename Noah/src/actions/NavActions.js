import { Actions } from 'react-native-router-flux';
import { resetFb } from '../actions';


export const toTests = () => {
 // resetFb();
        Actions.test(); 
};

export const toLearn = () => {
  Actions.learn(); 
};

export const toResult = () => {
  // ToDo: Prüflogik bisherige Fragen
  Actions.result();
};

//export const toQuestions = ({ testNumber }) => {
 export const toQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.quest();
};

export const toLearnBasicQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnbasic();
};

export const toLearnBinnenQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnbinnen();
};

export const toLearnSegelQuestions = () => {
  //console.log(testNumber);
  //Actions.quest({ Testnumber: testNumber });
  Actions.learnsegel();
};

export const toGlossar = () => {
  Actions.glossar();
};

/*
export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
*/
