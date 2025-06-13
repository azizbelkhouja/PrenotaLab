const Reservation = require('../models/reservation');
const Seminario = require('../models/seminario');
const Lab = require('../models/lab');

// Lab User modeling (GET ALL LABS)
// Get all labs based on the user's past reservations
// @return a sorted lab list
const labUserModeling = async (labs, username) => {
  const userReservations = await Reservation.find({ username: username });

  if (userReservations.length) {
    let labResult = {};
    userReservations.map(userReservation => {
      const id = userReservation.labId;
      labResult.hasOwnProperty(id) ? ++labResult[id] : (labResult[id] = 1);
    });
    const sortedLabResult = [];
    for (let lab in labResult) {
      sortedLabResult.push([lab, labResult[lab]]);
    }

    sortedLabResult.sort((a, b) => {
      return b[1] - a[1];
    });
    console.log(sortedLabResult);

    const newLabs = JSON.parse(JSON.stringify(labs));
    let i = 0;
    let extractedObj;
    for (let sortedLab of sortedLabResult) {
      newLabs.forEach((lab, index) => {
        if (lab._id == sortedLab[0]) {
          console.log('FOUND');
          extractedObj = newLabs.splice(index, 1);
        }
      });
      newLabs.splice(i, 0, extractedObj[0]);
      i++;
    }

    console.log(newLabs);

    return newLabs;
  } else {
    return labs;
  }
};

const moviesUserModeling = async username => {
  userPreference = {
    genre: {},
    director: {},
    cast: {},
  };

  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );
  const Allmovies = JSON.parse(JSON.stringify(await Movie.find({})));

  const moviesWatched = userReservations.map(reservation => {
    for (let seminario of Allseminari) {
      if (seminario._id == reservation.seminarioId) {
        return seminario;
      }
    }
  });

  //  console.log(moviesWatched);

  moviesWatched.map(seminario => {
    let genres = seminario.genre.replace(/\s*,\s*/g, ',').split(',');
    let directors = seminario.director.replace(/\s*,\s*/g, ',').split(',');
    let casts = seminario.cast.replace(/\s*,\s*/g, ',').split(',');
    for (let genre of genres) {
      userPreference.genre[genre]
        ? ++userPreference.genre[genre]
        : (userPreference.genre[genre] = 1);
    }
    for (let director of directors) {
      userPreference.director[director]
        ? ++userPreference.director[director]
        : (userPreference.director[director] = 1);
    }
    for (let cast of casts) {
      userPreference.cast[cast] ? ++userPreference.cast[cast] : (userPreference.cast[cast] = 1);
    }
  });

  //find seminari that are available for booking
  const availableSeminari = availableSeminariFilter(Allseminari);
  //console.log(availableSeminari)
  const seminariNotWatched = seminariNotWatchedFilter(availableSeminari, userReservations);
  //console.log(seminariNotWatched)

  const seminariRated = findRates(seminariNotWatched, userPreference);

  seminariRated.sort((a, b) => {
    return b[1] - a[1];
  });
  // console.log(moviesRated)

  const seminariToObject = seminariRated.map(array => {
    return array[0];
  });
  return seminariToObject;
};

const findRates = (seminariNotWatched, userPreference) => {
  const result = [];
  let rate;
  for (let seminario of seminariNotWatched) {
    rate = 0;
    for (let pref in userPreference) {
      rate += getRateOfProperty(pref, userPreference, seminario);
      //TODO we can use weights here
      console.log(rate, pref);
    }
    if (rate !== 0) result.push([seminario, rate]);
  }
  console.log(result);
  return result;
};

const getRateOfProperty = (pref, userPreference, seminario) => {
  let rate = 0;
  const values = Object.keys(userPreference[pref]).map(key => {
    return [key, userPreference[pref][key]];
  });
  let seminarioValues = seminario[pref].replace(/\s*,\s*/g, ',').split(',');
  for (value of values) {
    if (seminarioValues.length) {
      for (seminarioValue of seminarioValues) {
        if (seminarioValue == value[0]) {
          rate += value[1];
        }
      }
    }
  }

  return rate;
};

const availableSeminariFilter = Allseminari => {
  const today = new Date();
  const returnSeminari = [];
  Allseminari.map(seminario => {
    let releaseDate = new Date(seminario.releaseDate);
    let endDate = new Date(seminario.endDate);
    if (today >= releaseDate && today <= endDate) {
      returnSeminari.push(seminario);
    }
  });
  return returnSeminari;
};

const seminariNotWatchedFilter = (availableSeminari, userReservations) => {
  const returnSeminari = [];
  availableSeminari.map(seminario => {
    let isFirst = [];
    for (let reservation of userReservations) {
      if (reservation.seminarioId == seminario._id) {
        isFirst.push(false);
      } else {
        isFirst.push(true);
      }
    }

    if (isFirst.every(Boolean)) {
      returnSeminari.push(seminario);
    }
  });
  return returnSeminari;
};

const reservationSeatsUserModeling = async (username, newSeats) => {
  let numberOfTicketsArray = [];
  let numberOfTickets = 1;
  const positions = {
    front: 0,
    center: 0,
    back: 0,
  };
  const labs = JSON.parse(JSON.stringify(await Lab.find({})));
  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );

  userReservations.map(reservation => {
    for (let lab of labs) {
      if (lab._id == reservation.labId) {
        //find how many rows the lab has
        const position = getPosition(lab.seats.length, reservation.seats);
        ++positions[position];
        numberOfTicketsArray.push(reservation.seats.length);
      }
    }
  });
  numberOfTickets = Math.round(
    numberOfTicketsArray.reduce((a, b) => a + b, 0) / numberOfTicketsArray.length
  );

  return {
    numberOfTickets,
    positions,
  };
};

const getPosition = (labRows, seats) => {
  const rowNum = seats[0][0];
  const step = labRows / 3;
  let pos = 1;
  for (let i = step; i <= labRows; i += step) {
    if (rowNum < i) {
      switch (pos) {
        case 1:
          return 'front';
        case 2:
          return 'center';
        case 3:
          return 'back';
      }
    }
    pos++;
  }
};

const userModeling = {
  labUserModeling,
  seminariUserModeling,
  reservationSeatsUserModeling,
};

module.exports = userModeling;
