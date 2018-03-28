import {USER_STORAGE} from '@/auth/store';

const authChanged = (e) => {
  // const {newValue} = e;
  switch (e.key) {
  case USER_STORAGE: {
    console.log('user changed');
    break;
  }
  }
};

export {
  authChanged,
};
