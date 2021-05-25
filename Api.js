import { Observable} from "rxjs/dist/types";

function getRequest(url) {
  return new Observable(observer => {
    const controler = new AbortController();

    fetch(url, {
      signal: controler.signal
    })
    .then(res => res.json())
      .then((data) => {
        observer.next(data);
        observer.complete()
      })
      .catch(err => observer.error(err));

    return() => controler.abort();
  });
}
getRequest(url);
