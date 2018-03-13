import {createSelector} from 'reselect';

const modalSelector = store => store.modal;

// Is modal open: bool
const getModalOpen = modal => {
  return modal.open;
};

const isModalOpen = createSelector(
  modalSelector,
  getModalOpen
);

// Modal title: string
const getModalTitle = modal => {
  return modal.title;
};

const modalTitle = createSelector(
  modalSelector,
  getModalTitle
);

export {
  isModalOpen,
  modalTitle,
};
