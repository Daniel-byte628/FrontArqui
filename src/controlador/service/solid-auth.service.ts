import { Injectable } from '@angular/core';
import { getSolidDataset, getThing, getStringNoLocale, Thing } from '@inrupt/solid-client';


@Injectable({
  providedIn: 'root'
})
export class SolidAuthService {
  async fetchProfile(webId: string): Promise<Thing> {
    const profileDataset = await getSolidDataset(webId);
    return getThing(profileDataset, webId) as Thing;
  }
}
