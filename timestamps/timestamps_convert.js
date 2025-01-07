const convertUtcToIst = (utcDate) => {
    const offset = 330 * 60 * 1000; 
    const utcTime = utcDate.getTime();
    const istTime = new Date(utcTime + offset);
    return istTime;
};

export default convertUtcToIst;
