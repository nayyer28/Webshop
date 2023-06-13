import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {

  categories?: string[]
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription?: Subscription;


  constructor(private readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }

  getCategories(): void {
    this.categoriesSubscription = this.storeService.getAllCategories().subscribe((_categories) => this.categories = ['all', ..._categories])
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

}
