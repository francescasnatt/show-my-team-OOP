const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const questions = [
    {
      type: 'input',
      message: "What is your team manager's name?",
      name: 'managerName',
    },
    {
        type: 'input',
        message: "What is your team manager's id?",
        name: 'managerId',
    },
    {
        type: 'input',
        message: "What is your team manager's email?",
        name: 'managerEmail',
    },
    {
        type: 'input',
        message: "What is your team manager's office number?",
        name: 'managerOfficenum',
    },
    {
    type: 'list',
    message: "Which type of team member would you like to add?",
    name: 'newMember',
    choices: ['Engineer', 'Intern', 'None'],
    },
  ];

  // function to render info to page
function render() {
    
  }
  
  // function to initialize program
  function init() {
    inquirer
    .prompt(questions)
    .then((response) => {
      render()
      });
  }
  
  // function call to initialize program
  init();