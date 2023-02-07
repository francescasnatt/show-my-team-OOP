const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const teamMembers = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const managerQs = [
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


  const engineerQs = [
    {
      type: 'input',
      message: "What is your engineer's name?",
      name: 'engineerName',
    },
    {
        type: 'input',
        message: "What is your engineer's id?",
        name: 'engineerId',
    },
    {
        type: 'input',
        message: "What is your engineer's email?",
        name: 'engineerEmail',
    },
    {
        type: 'input',
        message: "What is your engineer's github username?",
        name: 'engineerGithub',
    },
    {
    type: 'list',
    message: "Which type of team member would you like to add?",
    name: 'newMember',
    choices: ['Engineer', 'Intern', 'None'],
    },
  ];


  const internQs = [
    {
      type: 'input',
      message: "What is your intern's name?",
      name: 'internName',
    },
    {
        type: 'input',
        message: "What is your intern's id?",
        name: 'internId',
    },
    {
        type: 'input',
        message: "What is your intern's email?",
        name: 'internEmail',
    },
    {
        type: 'input',
        message: "What is your intern's school called?",
        name: 'internSchool',
    },
    {
    type: 'list',
    message: "Which type of team member would you like to add?",
    name: 'newMember',
    choices: ['Engineer', 'Intern', 'None'],
    },
  ];

  // function to render info to page
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
  {err ? console.error(err) : console.log("Success!")});
}

// TO DO: incorporate this block into codebase to generate output directory
function buildTeam() {
  // Create the output directory if the output path doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}
  
  // function to initialize program
  function managerPrompt() {
    inquirer
    .prompt(managerQs)
    .then((response) => {
        const member = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficenum);
        teamMembers.push(member);
        if(response.newMember === "Engineer"){
            engineerPrompt();
        } else if(response.newMember === "Intern"){
            internPrompt();
        } else {
        const teamInfo = render(teamMembers);
        writeToFile('team.html', teamInfo);
        }
      });
  }

  function engineerPrompt() {
    inquirer
    .prompt(engineerQs)
    .then((response) => {
        const member = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        teamMembers.push(member);
        if(response.newMember === "Engineer"){
            engineerPrompt();
        } else if(response.newMember === "Intern"){
            internPrompt();
        } else {
        const teamInfo = render(teamMembers);
        writeToFile('team.html', teamInfo);
        }
      });
  }

  function internPrompt() {
    inquirer
    .prompt(internQs)
    .then((response) => {
        const member = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
        teamMembers.push(member);
        if(response.newMember === "Engineer"){
            engineerPrompt();
        } else if(response.newMember === "Intern"){
            internPrompt();
        } else {
        const teamInfo = render(teamMembers);
        writeToFile('team.html', teamInfo);
        }
      });
  }
  
  // function call to initialize program
  managerPrompt();