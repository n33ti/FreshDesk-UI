import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    
    searchText = searchText.toString().toLowerCase();
   console.log(items)
    return items.filter(a => {
     return a.query.toString().toLowerCase().includes(searchText) ||  a.id.toString().toLowerCase().includes(searchText) 
     ||  a.status.toString().toLowerCase().includes(searchText) ||  a.contactPerson.toString().toLowerCase().includes(searchText) || a.username.toString().toLowerCase().includes(searchText) ;
    //  a.toString().toLowerCase().includes(searchText);
    });
  }
}