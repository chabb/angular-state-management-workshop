import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, concatMap, map, switchMap } from 'rxjs';

import * as ProductActions from './product.actions';
import { ProductIntegrationService } from '../services/product-integration.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productIntegrationService: ProductIntegrationService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productIntegrationService.load().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      concatMap(({ product }) =>
        this.productIntegrationService.create(product).pipe(
          map(newProduct =>
            ProductActions.createProductSuccess({ product: newProduct })
          ),
          catchError(error =>
            of(ProductActions.createProductFailure({ error }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap(({ product }) =>
        this.productIntegrationService.update(product).pipe(
          map(updatedProduct =>
            ProductActions.updateProductSuccess({
              product: { id: updatedProduct.id, changes: updatedProduct }
            })
          ),
          catchError(error =>
            of(ProductActions.updateProductFailure({ error }))
          )
        )
      )
    );
  });

  removeProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.removeProduct),
      concatMap(({ id }) =>
        this.productIntegrationService.remove(id).pipe(
          map(() => ProductActions.removeProductSuccess({ id })),
          catchError(error =>
            of(ProductActions.removeProductFailure({ error }))
          )
        )
      )
    );
  });
}
