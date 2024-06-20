const converter = (unix_time) => {

    // Unix timestamp
    // var unix_time = 19800;  // Example Unix time
    
    // Convert Unix time to milliseconds
    var date = new Date(unix_time * 1000);
    
    // Extract hours, minutes, and period (AM/PM)
    var hours = date.getHours();
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;  // The hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
    
    // Format the time as HH:MM AM/PM
    var local_time_str = hours + ":" + minutes + " " + period;
    
    // Print local time in 12-hour format
   return local_time_str;
}
export default converter;