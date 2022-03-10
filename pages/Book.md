- {{query (and (page-property type Book) (page-property state reading))}}
  query-properties:: [:page :category :state]
-
- {{query (and (page-property type Book) (page-property state done))}}