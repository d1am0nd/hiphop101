import {createSelector} from 'reselect';

const modalSelector = (store) => store.modal;

// Is modal open: bool
const getModalOpen = (modal) => {
  return modal.open;
};

const isModalOpen = createSelector(
  modalSelector,
  getModalOpen
);

// Modal title: string
const getModalTitle = (modal) => {
  return modal.info.title;
};

const modalTitle = createSelector(
  modalSelector,
  getModalTitle
);

// Modal type: string
const getModalType = (modal) => {
  return modal.info.type;
};

const modalType = createSelector(
  modalSelector,
  getModalType
);

const modalBottom = createSelector(
  modalSelector,
  (modal) => modal.info.bottom
);

export {
  isModalOpen,
  modalTitle,
  modalBottom,
  modalType,
};
