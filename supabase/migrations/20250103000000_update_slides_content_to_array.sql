alter table public.slides 
  alter column content type text[] 
  using case 
    when content is null then null 
    else array[content] 
  end;

