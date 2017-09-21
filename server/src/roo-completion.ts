'use strict';

import {
	CompletionItem
} from 'vscode-languageserver';

enum ParameterType {
    Mandatory,
    Conditional,
    Optional
}

interface OptionsCompletionItem {
    type: string;
    options: CompletionItem[];
}

interface ParameterCompletionItem extends CompletionItem {
    parent: string;
    type: ParameterType;
    completionType: string;
    cancels: string[];
}

interface RooCompletionItems {
    commands: CompletionItem[];
    parameters: ParameterCompletionItem[]
    options: OptionsCompletionItem[];
}

export default class RooCompletionHelper {

    private commands: CompletionItem[];
    private staticValueCompletionItems: OptionsCompletionItem[];
    
    constructor() {
        var json = require('./roo-commands.json');
        console.log(json);
    }

    public getCommands() : CompletionItem[] {
        return this.commands;
    }

    public getValueCompletionItem(type: string) : OptionsCompletionItem {
        let vci = this.staticValueCompletionItems.filter(item => item.type == type)[0];
        
        if (vci == null) {
            console.warn(`${type} completion type doesn't exists`);
        }

        return vci;
    }
    
}

