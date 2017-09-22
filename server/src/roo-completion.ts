'use strict';
import fs = require('fs');
import { CompletionItem } from 'vscode-languageserver';

/*
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
}*/

interface XCompletionItem extends CompletionItem {
	parent: string;
}


export default class RooCompletionHelper {

    private json_data: string;
    
    private commands: XCompletionItem[];    
    private args: XCompletionItem[];    
    
    constructor(commandsPath: string) {
        
        this.json_data = fs.readFileSync(commandsPath, 'utf8');
        
        let completionItems = JSON.parse(this.json_data);
        
        // FIXME: Double iteration
        this.commands = completionItems.filter(this.filterCommand);
        this.args = completionItems.filter(this.filterArgs);
    }

    /*public getValueCompletionItem(type: string) : OptionsCompletionItem {
        let vci = this.staticValueCompletionItems.filter(item => item.type == type)[0];
        
        if (vci == null) {
            console.warn(`${type} completion type doesn't exists`);
        }

        return vci;
    }*/

    private filterCommand(item:XCompletionItem) : boolean {
        return item.parent == null;
    }

    private filterArgs(item:XCompletionItem) : boolean {
        // FIXME: Why return filterCommand(item) doesn't work?
        return item.parent != null;
    }

    public commandExists(command: string) {
        return this.commands.find(item => item.label == command.trim()) != null;
    }

    public getCommands() : CompletionItem[] {
        return this.commands;
    }

    public getArgs(command: string) {
        return this.args.filter(item => item.parent == command.trim());
    }
    
}

