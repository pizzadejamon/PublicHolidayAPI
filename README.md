# PublicHolidayAPI
This is a free Holiday API. It takes year & country as parameter and returns  
JSON object with all holidays and dates, for the given year.  

Most API's i could find on the internet were to pricy, so i decided to develop my own,  
and share the code for free. 

I'm hosting the API at https://api.mriehl.de
 

Any suggestions, fixes and comments are highly appreciated.  

Read further down below for technical stuff & how to use this API. 

#this is not finished, will add this later 

#Types
Type		Meaning  
  
0			Holiday on fixed Date (i.e: Christmas on 12-25)  
1			Holiday dependend on other day (i.e: Easter Friday in Germany)  
2			Holiday dependend on Weekday [+ offset] (i.e: "first monday of september")  
3			Holiday dependend on Last Weekday (i.e: "last friday of november")  
5			Special Day (no rules apply) -> country specific  