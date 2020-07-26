import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-chooser',
  templateUrl: './file-chooser.component.html',
  styleUrls: ['./file-chooser.component.scss'],
})
export class FileChooserComponent implements OnInit {
  files: Observable<any[]>
  @Input() icon:string;
  @Output() finishFile = new EventEmitter<any>();

  constructor(private fileChooser: FileChooser,) { }

  ngOnInit() {}
  currentFile: string = 'none';

  openChooser(){
    console.log('Opening chooser')
    this.fileChooser.open().then(uri => {
       
        console.log('File chosen: ', uri);
        this.currentFile = uri;
        this.finishFile.emit({msg: 'File is: ' + uri})
        alert('File is: ' + uri);
      })
      .catch(e => {
        console.log('Error choosing file: ', e);
      });

      
  }

}
