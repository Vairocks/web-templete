export const validateEmail = (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    }
    return false;
};

export const validatePhoneNumber = (typedNumber) => {
    let val = typedNumber.trim();
    val = val.replace(/[^0-9]/g, '');
    return val;
};