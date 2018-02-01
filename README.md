# Neo4j and ArangoDB performance Benchmarking
## Installation and Dependencies
Make sure you have NodeJS and NPM. Check if you do by running:

```node -v```

```npm -v```

steps to start the project
  - get the source from the repository ```git clone https://singh_hp1069@gitlab.tubit.tu-berlin.de/singh_hp1069/benchmarking.git```
  - go to project folder ```cd/benchmark```
  - install the project dependencies ```npm install```
  - run the project ``` npm start```

# Access Routes
for **Compared Results** Report :

  - ```http://localhost:3000/reports/```
  - 
 this will generate a report on web with number of iterations executed per opertions and the corresponding time taken in between **Neo4J** and **ArangoDB**.

for **Compared throughput Results** Reports :
  - ```http://localhost:3000/reports/throughput```


for **Neo4j** total time Reports :
  - ```http://localhost:3000/reports/noe4j```
  
 this will generate a report on web with number of iterations executed per opertions and the corresponding time taken.

for **Neo4j throughput** Reports :
  - ```http://localhost:3000/reports/noe4j/throughput```


for **ArangoDB** total time Reports :
  - ```http://localhost:3000/reports/arangodb```
  
 this will generate a report on web with number of iterations executed per opertions and the corresponding time taken.

for  **ArangoDB throughput** throughput Reports :
  - ```http://localhost:3000/reports/arangodb/throughput```