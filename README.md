# PublicHolidayAPI
This is a free Holiday API. It takes year & country as parameter and returns  
JSON object with all holidays and dates, for the given year.  

Most API's on the internet are too expansive, so i decided to develop my own,  
and share the code for free.  

Any suggestions, fixes and comments highly appreciated.  

Read further down below for technical stuff & how to use this API.  

#Types
Type		Meaning  
  
0			Holiday on fixed Date (i.e: Christmas on 12-25)  
1			Holiday dependend on other day (i.e: Easter Friday in Germany)  
2			Holiday dependend on Weekday [+ offset] (i.e: "first monday of september")  
3			Holiday dependend on Last Weekday (i.e: "last friday of november")  
5			Special Day (no rules apply) -> country specific  