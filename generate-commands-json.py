import re

commandRegex = re.compile('^\w([^--]+)')

# this regex matches until it finds one of the REPLACE chars
#commandRegex = re.compile('^([^(\(|\[|\{)]+)')
#REPLACE = "{}[]()|-"

#mandatoryRegex = re.compile('\{.*?\}')
#conditionalRegex = re.compile('\(.*?\)')
#optionalRegex = re.compile('\[.*?\]')

commands = list()

def parseLine(line):
    commandWithParams = line.strip()
    m = commandRegex.match(commandWithParams)
    if not m is None:
        command = m.group().strip()
        parameters = parseParameters(command, line[len(command):])

        newCommand = {}
        newCommand['command'] = command
        if len(parameters) > 0:
            newCommand['parameters'] = parameters
        commands.append(newCommand)

def parseParameters(command, parametersLine):
    commandParams = list()

    for p in parametersLine.strip().split(" "):
        param = p.strip()
        if param is not "":
            newParam = {}
            newParam['name'] = param[2:]
            #newParam['valueType'] = ""
            commandParams.append(newParam)

    return commandParams

for line in open('roo-commands.basic.txt'):
    parseLine(line)

print(str(commands).replace("'", "\""))