// ES6/ES2015
// app.js

'use strict';

import {
	CompletionItem
} from 'vscode-languageserver';

export default class RooCompletionHelper {

    private commands: CompletionItem[];
    
    constructor() {
        var json = require('./roo-commands.json');
        console.log(json);
    }

    public getCommands() : CompletionItem[] {
        return this.commands;
    }
    
}

