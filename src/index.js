'use strict';
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import popUpShow from './modules/popUpShow';
import accordMenu from './modules/accordMenu';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import showMore from './modules/showMore';

popUpShow();
accordMenu();
calc();
sendForm();
showMore();