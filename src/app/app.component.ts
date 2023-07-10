import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { Person } from './interfaces/person.interface';
import { Observable, OperatorFunction, Subject, Subscription, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';

const persons = [
  {
    name: 'Susan Boyle',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Marc Johnson',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: ' 169 11th Street, 94103 San Francisco ads ad ss'
  },
  {
    name: 'PiedPiper',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: ' 169 11th Street, 94103 San Francisco ads ad ss',
    children: [
      {
        name: 'Children 1',
        type: 'company',
        email: '1 - someone@gmail.com',
        phoneNo: '1 - +1 628 291 2098',
        companyName: '1 -',
        address: '1 - 169 11th Street, 94103 San Francisco',
        children: [
          {
            name: 'Children 21',
            type: 'company',
            email: '21 - someone@gmail.com',
            phoneNo: '21 - +1 628 291 2098',
            companyName: '21 -',
            address: '21 - 169 11th Street, 94103 San Francisco'
          },
          {
            name: 'Children 31',
            type: 'company',
            email: '31 - someone@gmail.com',
            phoneNo: '31 - +1 628 291 2098',
            companyName: '31 -',
            address: '31 - 169 11th Street, 94103 San Francisco'
          },
        ]
      },
      {
        name: 'Children 2',
        type: 'company',
        email: '2 - someone@gmail.com',
        phoneNo: '2 - +1 628 291 2098',
        companyName: '2 -',
        address: '2 - 169 11th Street, 94103 San Francisco',
        children: [
          {
            name: 'Children 21',
            type: 'company',
            email: '21 - someone@gmail.com',
            phoneNo: '21 - +1 628 291 2098',
            companyName: '21 -',
            address: '21 - 169 11th Street, 94103 San Francisco'
          },
          {
            name: 'Children 31',
            type: 'company',
            email: '31 - someone@gmail.com',
            phoneNo: '31 - +1 628 291 2098',
            companyName: '31 -',
            address: '31 - 169 11th Street, 94103 San Francisco'
          },
        ]
      },
      {
        name: 'Children 3',
        type: 'company',
        email: '3 - someone@gmail.com',
        phoneNo: '3 - +1 628 291 2098',
        companyName: '3 -',
        address: '3 - 169 11th Street, 94103 San Francisco'
      },
    ]
  },
  {
    name: 'PiedPiper',
    type: 'company',
    email: 'someone_at_very_lonng_long_long@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: '',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'PiedPiper',
    type: 'company',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: '',
    address: '169 11th Street, 94103 San Francisco',
    children: [
      {
        name: 'Children 21',
        type: 'company',
        email: '21 - someone@gmail.com',
        phoneNo: '21 - +1 628 291 2098',
        companyName: '21 -',
        address: '21 - 169 11th Street, 94103 San Francisco'
      },
      {
        name: 'Children 31',
        type: 'company',
        email: '31 - someone@gmail.com',
        phoneNo: '31 - +1 628 291 2098',
        companyName: '31 -',
        address: '31 - 169 11th Street, 94103 San Francisco'
      },
    ]
  },
  {
    name: 'PiedPiper',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Florin Galan',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'March Andreesen',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco',
    children: [
      {
        name: 'Andreesen',
        type: 'company',
        email: '21 - someone@gmail.com',
        phoneNo: '21 - +1 628 291 2098',
        companyName: '21 -',
        address: '21 - 169 11th Street, 94103 San Francisco'
      },
      {
        name: 'Space X',
        type: 'company',
        email: '31 - someone@gmail.com',
        phoneNo: '31 - +1 628 291 2098',
        companyName: '31 -',
        address: '31 - 169 11th Street, 94103 San Francisco'
      },
    ]
  },
  {
    name: 'Ben Horowitz',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Ben Horowitz 12',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Ben Horowitz 13',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Ben Horowitz 14',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
  {
    name: 'Ben Horowitz 15',
    type: 'person',
    email: 'someone@gmail.com',
    phoneNo: '+1 628 291 2098',
    companyName: 'Alphabet',
    address: '169 11th Street, 94103 San Francisco'
  },
];

@Component({
    selector: 'agb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, TableComponent]
})
export class AppComponent implements OnInit, OnDestroy {

  originalTableRows: Person[] = persons;
  tableRows: Person[] = persons;

  tableHeaders: string[] = Object.keys(this.tableRows[0]);

  private readonly searchSubject = new Subject<string | undefined>();
  private searchSubscription?: Subscription;


  /**
   * The ngOnInit function sets up a subscription to a searchSubject, which filters table rows based on
   * a search query and updates the tableRows variable with the filtered results.
   */
  public ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchQuery) => this.filterTableRows(searchQuery))
      )
      .subscribe((results) => (this.tableRows = results));
  }

  /**
   * The ngOnDestroy function is used to unsubscribe from a search subscription.
   */
  public ngOnDestroy(): void {
      this.searchSubscription.unsubscribe();
  }

  /**
   * The function onSearchQueryInput takes an event as input, extracts the value from the input
   * element, trims it, and emits it as the next value of a searchSubject.
   * @param {Event} event - The event parameter is of type Event and represents the event that
   * triggered the search query input.
   */
  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  /**
   * The function filters an array of table rows based on a search query and returns an observable of
   * the filtered rows.
   * @param {string} searchQuery - The searchQuery parameter is a string that represents the search
   * query entered by the user. It is used to filter the table rows based on the search query.
   * @returns an Observable of type Person[].
   */
  public filterTableRows(searchQuery: string): Observable<Person[]> {
    return of(this.filterTableRowsWithChildren(this.originalTableRows, searchQuery));
  }

  /**
   * The function filters an array of persons based on a search query, including any children of the
   * persons.
   * @param {Person[]} persons - An array of objects representing persons. Each person object has
   * properties like name and children.
   * @param searchQuery - The `searchQuery` parameter is a string that represents the search query used
   * to filter the `persons` array. It is used to check if the `name` property of each person in the
   * array includes the search query.
   * @returns The function `filterTableRowsWithChildren` returns an array of `Person` objects that
   * match the search query.
   */
  private filterTableRowsWithChildren(persons: Person[], searchQuery): Person[] {


    /* The code is filtering the `persons` array based on a search query. It uses the `reduce` function
    to iterate over each person in the array. */
    const filteredPersons: Person[] = persons.reduce((acc: Person[], person: Person) => {
      if (person.name.includes(searchQuery)) {
        acc.push(person);
      }

      if (person.children && person.children.length > 0) {
        const childrenResults: Person[] = this.filterTableRowsWithChildren(person.children, searchQuery);
        if (childrenResults.length > 0) {
          const deepCopyPerson: Person = { ...person, children: childrenResults };
          acc.push(deepCopyPerson);
        }
      }

      return acc;
    }, []);

    return filteredPersons;

  }

  /**
   * The function `deleteRow` takes a `Person` object as a parameter and logs a message indicating that
   * the person has been deleted.
   * @param {Person} person - The parameter "person" is of type "Person".
   */
  deleteRow(person: Person): void {
    // Delete logic here
    console.log('Delete person:', person);
  }

  /**
   * The function "editRow" logs a message indicating that a row at a specific index is being edited.
   * @param {number} index - The index parameter is a number that represents the index of the row that
   * needs to be edited.
   */
  editRow(index: number): void {
    // Edit logic here
    console.log('Edit row at index:', index);
  }



}
