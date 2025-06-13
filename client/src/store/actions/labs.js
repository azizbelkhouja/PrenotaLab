import { GET_LABS, GET_LAB } from '../types';
import { setAlert } from './alert';

export const uploadLabImage = (id, image) => async dispatch => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/labs/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getCinemas = () => async dispatch => {
  try {
    const url = '/cinemas';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const labs = await response.json();
    if (response.ok) {
      dispatch({ type: GET_LABS, payload: labs });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getLab = id => async dispatch => {
  try {
    const url = '/labs/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const lab = await response.json();
    if (response.ok) {
      dispatch({ type: GET_LAB, payload: lab });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const createLabs = (image, newLab) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/labs';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLab)
    });
    const lab = await response.json();
    if (response.ok) {
      dispatch(setAlert('Lab Created', 'success', 5000));
      if (image) dispatch(uploadLabImage(lab._id, image));
      dispatch(getLabs());
      return { status: 'success', message: 'Lab Created' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lab have not been saved, try again.'
    };
  }
};

export const updateLabs = (image, lab, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/labs/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lab)
    });
    if (response.ok) {
      dispatch(setAlert('Lab Updated', 'success', 5000));
      if (image) dispatch(uploadLabImage(id, image));
      return { status: 'success', message: 'Lab Updated' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lab have not been updated, try again.'
    };
  }
};

export const removeLabs = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/labs/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Lab Deleted', 'success', 5000));
      return { status: 'success', message: 'Lab Removed' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lab have not been deleted, try again.'
    };
  }
};

export const getLabsUserModeling = username => async dispatch => {
  try {
    const url = '/labs/usermodeling/' + username;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const labs = await response.json();
    if (response.ok) {
      dispatch({ type: GET_LABS, payload: labs });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
