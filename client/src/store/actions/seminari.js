import { GET_SEMINARI, SELECT_SEMINARIO,GET_SUGGESTIONS } from '../types';
import { setAlert } from './alert';

export const uploadSeminarioImage = (id, image) => async dispatch => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/seminari/photo/' + id;
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

export const getSeminari = () => async dispatch => {
  try {
    const url = '/seminari';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const seminari = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SEMINARI, payload: seminari });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const onSelectSeminario = seminario => ({
  type: SELECT_SEMINARIO,
  payload: seminario
});

export const getSeminario = id => async dispatch => {
  try {
    const url = '/seminari/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const seminario = await response.json();
    if (response.ok) {
      dispatch({ type: SELECT_SEMINARIO, payload: seminario });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getSeminarioSuggestion = id => async dispatch => {
  try {
    const url = '/seminari/usermodeling/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const seminari = await response.json();
    if (response.ok) {
      dispatch({ type: GET_SUGGESTIONS, payload: seminari });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addSeminario = (image, newSeminario) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/seminari';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSeminario)
    });
    const seminario = await response.json();
    if (response.ok) {
      dispatch(setAlert('Seminario have been saved!', 'success', 5000));
      if (image) dispatch(uploadSeminarioImage(seminario._id, image));
      dispatch(getSeminari());
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const updateSeminario = (seminarioId, seminario, image) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/seminari/' + seminarioId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(seminario)
    });
    if (response.ok) {
      dispatch(onSelectSeminario(null));
      dispatch(setAlert('Seminario have been saved!', 'success', 5000));
      if (image) dispatch(uploadSeminarioImage(seminarioId, image));
      dispatch(getSeminari());
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const removeSeminario = seminarioId => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/seminari/' + seminarioId;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(getSeminari());
      dispatch(onSelectSeminario(null));
      dispatch(setAlert('Seminario have been Deleted!', 'success', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
