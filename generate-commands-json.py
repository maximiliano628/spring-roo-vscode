import re

replace = "{}[]()|-"
commandRegex = re.compile('^([^(\(|\[|\{)]+)')

#mandatoryRegex = re.compile('{.*?}')
#conditionalRegex = re.compile('\(.*?\)')
#optionalRegex = re.compile('\[.*?\]')

commands = {}
paramteres = list()

def parseLine(line):
    commandWithParams = line.strip()
    m = commandRegex.match(commandWithParams)
    if not m is None:
        command = m.group().strip()
        commands[command] = list()
        
        parseParameters(command, line[len(command):])

def parseParameters(command, parameters):
    print(command)
    for r in replace:
        parameters = parameters.replace(r, "")
    
    for p in parameters.strip().split(" "):
        param = p.strip()
        if param is not "":
            print("    " + param)
//
for line in open('roo-commands.txt'):
      parseLine(line)