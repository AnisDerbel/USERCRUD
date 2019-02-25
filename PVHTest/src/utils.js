export const isValidateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const isEmpty = (text) => {
  return !text
}

export const isValidFullName = (text) => {
  return !!text && text.split(' ').length > 1
}

export const isValidDutchPhone = (phone) => {
  var re = /^(\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10})$/;
  return re.test(String(phone).toLowerCase());
}

export const isValidHouseNumber = (number) => {
  return !isNaN(number)
}

export const validateInput = (userInput,userAddress) => {
  
  for(let i=0;i<userAddress.length;i++){
    const address = userAddress[0]
    if(!isValidHouseNumber(address.number)){
      return 'please enter a valid house number in the Address '+(i+1)
    }
    if(isEmpty(address.zipcode)){
      return 'please enter a valid zipcode in the Address '+(i+1)
    }
    if(isEmpty(address.street)){
      return 'please enter a valid street in the Address '+(i+1)
    }
    if(isEmpty(address.city)){
      return 'please enter a valid city in the Address '+(i+1)
    }
  }

  if(!isValidFullName(userInput.name)){
    return 'please enter valid Full Name' 
  }
  if(!isValidateEmail(userInput.email)){
    return 'please enter valid Email' 
  }

  if(!isValidDutchPhone(userInput.phone)){
    return 'please enter valid Deutch Phone Number' 
  }
  if(isEmpty(userInput.gender)){
    return 'please select a Gender'
  }

  return ''

}