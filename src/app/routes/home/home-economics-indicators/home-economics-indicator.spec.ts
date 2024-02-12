import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { HomeEconomicsIndicatorsComponent } from './home-economics-indicators.component';

describe('[L2] - HomeEconomicsIndicatorsComponent', () => {
    let component: HomeEconomicsIndicatorsComponent;
    let fixture: ComponentFixture<HomeEconomicsIndicatorsComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ HomeEconomicsIndicatorsComponent ],
        imports: [
        RouterTestingModule,
        MatCardModule,
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEconomicsIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    // HTML

    it('[L2] - debe renderizar el contenedor de indicadores', () => {
        const indicatorsContainer = fixture.debugElement.query(By.css('.indicators-container'));
        expect(indicatorsContainer).toBeTruthy();
    });
    
    it('[L2] - debe renderizar la cantidad correcta de tarjetas de indicadores', () => {
        component.economicIndicators = [
        { name: "Inflación", value: "5.4%", description: "Tasa anual" },
        { name: "PIB", value: "3.2%", description: "Crecimiento anual" },
        { name: "Desempleo", value: "7.1%", description: "Tasa nacional" }
        ];
        fixture.detectChanges();
        const indicatorCards = fixture.debugElement.queryAll(By.css('.indicator-card'));
        expect(indicatorCards.length).toEqual(3);
    });
    
    it('[L2] - debe mostrar el titulo de cada indicador correctamente', () => {
        component.economicIndicators = [
        { name: "Inflacion", value: "5.4%", description: "Tasa anual" },
        { name: "PIB", value: "3.2%", description: "Crecimiento anual" },
        { name: "Desempleo", value: "7.1%", description: "Tasa nacional" }
        ];
        fixture.detectChanges();
        const indicatorTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
        expect(indicatorTitles[0].nativeElement.textContent).toContain('Inflacion');
        expect(indicatorTitles[1].nativeElement.textContent).toContain('PIB');
        expect(indicatorTitles[2].nativeElement.textContent).toContain('Desempleo');
    });
    
    it('[L2] - debe mostrar el valor de cada indicador correctamente', () => {
        component.economicIndicators = [
        { name: "Inflacion", value: "5.4%", description: "Tasa anual" },
        { name: "PIB", value: "3.2%", description: "Crecimiento anual" },
        { name: "Desempleo", value: "7.1%", description: "Tasa nacional" }
        ];
        fixture.detectChanges();
        const indicatorValues = fixture.debugElement.queryAll(By.css('mat-card-content p:first-child'));
        expect(indicatorValues[0].nativeElement.textContent).toContain('5.4%');
        expect(indicatorValues[1].nativeElement.textContent).toContain('3.2%');
        expect(indicatorValues[2].nativeElement.textContent).toContain('7.1%');
    });
    
    it('[L2] - debe mostrar la descripcion de cada indicador correctamente', () => {
        component.economicIndicators = [
        { name: "Inflacion", value: "5.4%", description: "Tasa anual" },
        { name: "PIB", value: "3.2%", description: "Crecimiento anual" },
        { name: "Desempleo", value: "7.1%", description: "Tasa nacional" }
        ];
        fixture.detectChanges();
        const indicatorDescriptions = fixture.debugElement.queryAll(By.css('mat-card-content p:last-child'));
        expect(indicatorDescriptions[0].nativeElement.textContent).toContain('Tasa anual');
        expect(indicatorDescriptions[1].nativeElement.textContent).toContain('Crecimiento anual');
        expect(indicatorDescriptions[2].nativeElement.textContent).toContain('Tasa nacional');
    });
  
    // Component
    it('[L2] - debe inicializar economicIndicators correctamente con datos', () => {
        const mockData = [
        { name: "Inflacion", value: "5.4%", description: "Tasa anual" },
        { name: "PIB", value: "3.2%", description: "Crecimiento anual" },
        { name: "Desempleo", value: "7.1%", description: "Tasa nacional" }
        ];
        component.economicIndicators = mockData;
        expect(component.economicIndicators.length).toBeGreaterThan(0);
        expect(component.economicIndicators).toEqual(mockData);
    });

    it('[L2] - debe manejar correctamente un arreglo vacio de indicadores', () => {
        component.economicIndicators = [];
        expect(component.economicIndicators.length).toEqual(0);
    });

    it('[L2] - debe actualizar la vista correctamente cuando los datos de economicIndicators cambian despues de la inicializacion', () => {
        component.economicIndicators = [
        { name: "Inflacion", value: "5.4%", description: "Tasa anual" }
        ];
        fixture.detectChanges();
    
        component.economicIndicators = [
        { name: "Inflacion", value: "5.5%", description: "Tasa actualizada" },
        { name: "PIB", value: "3.3%", description: "Crecimiento actualizado" }
        ];
        fixture.detectChanges();
    
        const indicatorCards = fixture.debugElement.queryAll(By.css('.indicator-card'));
        expect(indicatorCards.length).toEqual(2);
    
        const firstCardValue = fixture.debugElement.query(By.css('.indicator-card:first-child mat-card-content p:first-child')).nativeElement.textContent;
        expect(firstCardValue).toContain('5.5%');
  });
  

});
