import BaseService from "./BaseService.js";
import inquirer from "inquirer";

export default class ThemeService extends BaseService {
    constructor() {
        super();
        this.repository = "";
        this.directory = "";
    }

    async run() {
        await this.promptForDetails();

        if (!this.repository || !this.directory) {
            console.error('Something went wrong');
            process.exit(1);
        }

        this.cloneRepository(this.getRepository("theme"), this.directory);

        this.removeGitRepositoryFile();

        this.addNewGitRepository(this.repository);

        this.installDependencies();

        // console.log("Deploy changes: " + this.deployChanges);
        // if (this.deployChanges) {
        //     this.pushInitialCommit();
        // }

        console.log('Setup completed successfully!');
    }


    async promptForDetails() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'repository',
                message: 'Enter the repository URL:',
                validate: (input) => (input ? true : 'Repository URL is required'),
            },
            {
                type: 'input',
                name: 'directory',
                message: 'Enter the destination directory name:',
                validate: (input) => (input ? true : 'Destination directory name is required'),
            }
        ]);

        this.repository = answers.repository;
        this.directory = answers.directory;
    }
}