import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.getWeather(this.city);
  }

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = "";
  units: string = "metric";

  constructor(private weatherService: WeatherService) {
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      }, error: (error) => {
        console.log(error.message)
      }, complete: () => {
        console.log("API call completed");
      }
    })
  }

}
