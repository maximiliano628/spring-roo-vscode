/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as path from 'path';

import { workspace, ExtensionContext, WorkspaceConfiguration } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, CancellationToken, Middleware, Proposed, ProposedFeatures } from 'vscode-languageclient';

interface ExampleSettings {
	maxNumberOfProblems: number;
	commandsPath: string;
}

export function activate(context: ExtensionContext) {

	let serverModule = context.asAbsolutePath(path.join('server', 'server.js'));
	let debugOptions = { execArgv: ["--nolazy", "--debug=6009"] };
	
	let commands = context.asAbsolutePath(path.join('resources', 'roo-commands.js'));

	let serverOptions: ServerOptions = {
		run : { module: serverModule, transport: TransportKind.ipc, args:[commands], options: debugOptions },
		debug: { module: serverModule, transport: TransportKind.ipc, args:[commands], options: debugOptions }
	}
	
	let middleware: ProposedFeatures.ConfigurationMiddleware | Middleware = {
		workspace: {
			configuration: (params: Proposed.ConfigurationParams, _token: CancellationToken, _next: Function): any[] => {
				if (!params.items) {
					return null;
				}
				let result: (ExampleSettings | null)[] = [];
				for (let item of params.items) {
					// The server asks the client for configuration settings without a section
					// If a section is present we return null to indicate that the configuration
					// is not supported.
					if (item.section) {
						result.push(null);
						continue;
					}
					let config: WorkspaceConfiguration;
					if (item.scopeUri) {
						//config = workspace.getConfiguration('roolsp', client.protocol2CodeConverter.asUri(item.scopeUri));
					} else {
						config = workspace.getConfiguration('roolsp');
					}
					let newConf = {
						maxNumberOfProblems: 1000,
						commandsPath: commands
					};
					result.push(newConf);
				}
				return result;
			}
		}
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{scheme: 'file', language: 'roo'}],
		synchronize: {
			configurationSection: 'roolsp',
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		},
		middleware: middleware as Middleware
	}
	
	let disposable = new LanguageClient('roolsp', 'Roo Language Server', serverOptions, clientOptions).start();
	
	context.subscriptions.push(disposable);
}
