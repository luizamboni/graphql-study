GraphQl Study
===


run it
```bash
$ ./run.sh
```


Enter in (graphiQl playground)[http://localhost:4000]
```ruby
{
  users {
    id
    name
    terminals {
      id
      user_id
      invoices {
        terminal_id
        date
        paid
      }
    }
  }
}
```