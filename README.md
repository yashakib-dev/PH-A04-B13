Questions:
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?


Answers:
1. =>getElementById deals with one unique id and select single element and  it returns single element object.

=>And when ever we talk about multiple elements selector the getElementsByClassName comes first . By using a class name it can select multiple elements and returns HTML collection.

=> querySelector basically use CSS selectors and select first matching element and returns single element.

=>On the other hand querySelectorAll select all matching elements using CSS selectors and returns NodeList.




2. s-1=> At first i will declare a variable. for example - let div.
s-2=> next, By using -  document.createElement("div")  will create an element.
s-3=> after that i'll use  div.innerText = "Hello"  for implementing the content.
s-4=> Lastly i append the element using .appendChild(div).




3. => The process of executing an even from its triggered element to root( document) element is called event bubbling.

=>When we triggered an element the event is first executed on the original target element and it moves from the element through its parent elements and this process continues until it reaches the root of the document. That's how it's works.




4. =>Event Delegation means using one parent event listener to handle events of all child elements.It handles all child events using event bubbling.

=>By using it , we don't need to add multiple event listener to the child elements. We can only use the one parent event listener for all children.




5. =>preventDefault() stops the browser’s default action for an event.
For example:
 <a href="www.youtube.com">YouTube</a>
Normally,after clicking the link opens YouTube.
With preventDefault(), browser doesn’t go anywhere, but the alert still runs.

=>stopPropagation() stops the event from bubbling up the DOM.
For example:
Normally, without stopPropagation(), it would show -
"Child clicked!" → "Parent clicked!" because of bubbling.
Now it will only show "Child clicked!".